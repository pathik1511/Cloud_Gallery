import pymysql
import json


def lambda_handler(event, context):
    endpoint = 'dbcloud.cr1myqujll1z.us-east-1.rds.amazonaws.com'
    username = 'admin'
    password = 'admin1234'
    database_name = 'db_cloud'

    connection = pymysql.connect(host=endpoint, user=username, password=password,db=database_name)
    cursor = connection.cursor()
    print(event)
    #data = json.loads(event['body'])
    #username = data['username']
    username = event['queryStringParameters']['username']
    sql = "select * from `images` where username='"+username+"'";
    try:
        cursor.execute(sql)
        result = cursor.fetchall()
        print(result)
        library_list = []
        share_lib_list = []
        for row in result:
            id, username, library, share_lib, times = row
            temp_json = {}
            print(library)
            if library is None:
                temp_json['share_lib'] = share_lib
                share_lib_list.append(temp_json)
            else:
                temp_json['library'] = library
                library_list.append(temp_json)
        
        print(library_list)
        print(share_lib_list)
        main_body = {}
        main_body['library'] = library_list
        main_body['share_lib'] = share_lib_list
        response = {
            'statusCode': 200,
            'body':json.dumps(main_body),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        print(response)
        #connection.close()
        return response
        
    #     return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }

    except:
        response = {
            'statusCode': 200,
            'error':'error',
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }
        return response
