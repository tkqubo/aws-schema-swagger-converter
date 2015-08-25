import * as request from 'request';
import * as http from 'http';


let uri = 'http://raw.githubusercontent.com/aws/aws-sdk-js/master/apis/ec2-2015-04-15.normal.json';
request.get(uri, (err: any, res: http.IncomingMessage, body: any) => {
    let json: any = JSON.parse(body);
    console.log(json.version);
});
