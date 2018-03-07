const CfnLambda = require('cfn-lambda');
import AWS from 'aws-sdk';
import { Create, Update, Delete } from './Pipeline';
import Schema from './schema.json';

module.exports.pipelineHandler = (event, context) => {
  const ElasticTranscoderPipeline = CfnLambda({
    Create: Create,
    Update: Update,
    Delete: Delete,
    Schema,
  });
  AWS.config.region = currentRegion(context);
  return ElasticTranscoderPipeline(event, context);
};

const currentRegion = context => {
  return context.invokedFunctionArn.match(/^arn:aws:lambda:(\w+-\w+-\d+):/)[1];
};
