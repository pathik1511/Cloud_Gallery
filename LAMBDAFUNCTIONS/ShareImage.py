import pymysql
import boto3
import json

endpoint = 'dbcloud.cr1myqujll1z.us-east-1.rds.amazonaws.com'
username = 'admin'
password = 'admin1234'
database_name = 'db_cloud'
connection = pymysql.connect(host=endpoint, user=username, password=password,db=database_name)

SENDER = "ks412794@dal.ca"
SUBJECT = "Image shared"


sns = boto3.client('sns')


def lambda_handler(event, context):
    if event:
        print(event)
        try:
            cursor= connection.cursor()
            data = json.loads(event['body'])
            receiverId = data['receiverId']
            senderId = data['senderId']
            imageName = data['imageName'] 
            
            print("......"+receiverId)
            print("......"+senderId)
            print("------"+imageName)
            
            sql = "SELECT * FROM `images` WHERE username=%s AND library=%s"
            values = (senderId,imageName)
            cursor.execute(sql,values)
            results = cursor.fetchone()
            print(results)
            if results:
                print("image is here")
                
                sql = "SELECT * FROM `user_auth` WHERE email=%s"
                values = (receiverId)
                cursor.execute(sql,values)
                results = cursor.fetchone()
                print(results)
            
                
                if results:
                    phone_number = results[2]

                    print("user exist")
                    
                    sql = "INSERT INTO `images` (`username`, `library`,`share_lib`,`times`) VALUES (%s, %s, %s, %s)"
                    values = (receiverId, None , imageName, None)
                    cursor.execute(sql, values)
                    connection.commit()
                
                    text = senderId + " has shared an image with you. Please login to check an image!"
                    sns.publish(PhoneNumber = phone_number, Message=text )
            
                    print("sms sent")
                    email = False
                    # if receiverId == "kishanpatel61298@gmail.com":
                    #     MY_SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:993624886457:email'
                    #     email = True
                    # elif receiverId == "pathikpatel307@gmail.com":
                    #     MY_SNS_TOPIC_ARN = 'arn:aws:sns:us-east-1:993624886457:email2'
                    #     email = True
                    
                    if email:
                        sns_client = boto3.client('sns')
                        sns_client.publish(
                            TopicArn = MY_SNS_TOPIC_ARN,
                            Subject = 'Shared an image',
                            Message = senderId + 'has shared an image. Please check by login into your account!'
                        )
            
                    return {'statusCode':200,'body':'successfully shared','headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }}
                else:
                    print("user doesn't exist")
                    return {'statusCode':200,'body':'Receiver does not exist!','headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }}
                
            else:
                print("no image")
                responseBody = "Please enter correct image name!"
                response = {
                    'statusCode': 200,
                    'body': responseBody,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
                return response
            
        except Exception as e:
            print(e)
            raise e