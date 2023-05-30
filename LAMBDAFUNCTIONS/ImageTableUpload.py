import pymysql
import boto3
import json

secret_name = "mysqlCredentials"
region_name = "us-east-1"
session = boto3.session.Session()
client = session.client(service_name='secretsmanager',region_name=region_name)
get_secret_value_response = client.get_secret_value(SecretId=secret_name)
secret = json.loads(get_secret_value_response['SecretString'])

endpoint = secret['host']
username = secret['username']
password = secret['password']
database_name = secret['dbname']


connection = pymysql.connect(host=endpoint, user=username, password=password,db=database_name)


def lambda_handler(event, context):
    if event:
        print(event)
        try:
            cursor= connection.cursor()
            data = json.loads(event['body'])
            username = data['username']
            library = data['library']
         
            
            sql = "INSERT INTO `images` (`id`,`username`,`library`,`share_lib`, `times`) VALUES (%s, %s, %s, %s, %s)"
            values = (None,username,library,"",None)
            cursor.execute(sql, values)
            connection.commit()
            
            
            return {'statusCode':200,'body':'successfully uploaded'}
        except Exception as e:
            print(e)
            raise e