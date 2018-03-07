import AWS from 'aws-sdk';

const elastictranscoder = new AWS.ElasticTranscoder();

export const Create = (params, reply) => {
  elastictranscoder.createPipeline(params, (err, data) => {
    if (err) {
      console.error(err);
      reply(err);
    } else {
      reply(null, data.Pipeline.Id, { Arn: data.Pipeline.Arn });
    }
  });
};

export const Update = (physicalId, params, oldParams, reply) => {
  console.log('params', params);

  const paramsWithId = { ...params, Id: physicalId };
  const { OutputBucket, ...rest } = paramsWithId;
  const paramsNext = OutputBucket
    ? {
        ...rest,
        ContentConfig: {
          ...rest.ContentConfig,
          Bucket: OutputBucket,
        },
        ThumbnailConfig: {
          ...rest.ThumbnailConfig,
          Bucket: OutputBucket,
        },
      }
    : rest;

  elastictranscoder.updatePipeline(paramsNext, (err, data) => {
    if (err) {
      console.error(err);
      reply(err);
    } else {
      reply(null, data.Pipeline.Id, { Arn: data.Pipeline.Arn });
    }
  });
};

export const Delete = (physicalId, params, reply) => {
  const p = {
    Id: physicalId,
  };
  elastictranscoder.deletePipeline(p, (err, data) => {
    if (err) console.error(err);
    reply(err, physicalId);
  });
};
