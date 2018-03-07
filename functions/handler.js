const CfnLambda = require('cfn-lambda');
import AWS from 'aws-sdk';
import { Create, Update, Delete } from './Pipeline';

module.exports.pipelineHandler = (event, context) => {
  const schemaPath = [__dirname, 'schema.json'];
  console.log('schemaPath', schemaPath);
  const ElasticTranscoderPipeline = CfnLambda({
    Create: Create,
    Update: Update,
    Delete: Delete,
    SchemaPath: [__dirname, 'schema.json'],
  });
  // Not sure if there's a better way to do this...
  AWS.config.region = currentRegion(context);
  return ElasticTranscoderPipeline(event, context);
};

const currentRegion = context => {
  return context.invokedFunctionArn.match(/^arn:aws:lambda:(\w+-\w+-\d+):/)[1];
};
