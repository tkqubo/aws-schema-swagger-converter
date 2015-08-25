/// <reference path="node_modules/swagger.d.ts/swagger.d.ts" />
import * as request from 'request';
import * as http from 'http';

let s: any = {};

let uri = 'http://raw.githubusercontent.com/aws/aws-sdk-js/master/apis/ec2-2015-04-15.normal.json';
request.get(uri, (err: any, res: http.IncomingMessage, body: any) => {
    let aws: any = JSON.parse(body);
    let swagger: Swagger.Spec = {
        swagger: '2.0',
        info: {
            title: aws.metadata.serviceFullName,
            version: aws.metadata.apiVersion,
            description: aws.documentation
        },
        paths: {

        },
        definitions: {

        }
    };
    for (let name in aws.shapes) {
        let shape = aws.shapes[name];
        swagger.definitions[name] = parse(shape);
    }

    console.log(JSON.stringify(swagger, null, 2));
});

function parse(shape: any): Swagger.Schema {
    let model: Swagger.Schema = { };
    model.title = shape.locationName;
    model.description = shape.documentation;
    switch(shape.type) {
        case 'blob':
        case 'structure':
            model.type = 'object';
            break;
        case 'list':
            model.type = 'array';
            break;
        case 'timestamp':
        case 'string':
            model.type = 'string';
            break;
        case 'boolean':
            model.type = 'boolean';
            break;
        default:
            model.type = 'number';
            break;
    }
    // for object
    if (shape.members) {
        model.properties = { };
        for (let name in shape.members) {
            model.properties[name] = parse(shape.members[name]);
        }
    }
    // for array
    if (shape.type == 'list' && shape.member) {
        let schema: Swagger.Schema = {
            $ref: `#/definitions/${shape.member.shape}`
        }
        model.items = schema;
    }
    return model;
}
