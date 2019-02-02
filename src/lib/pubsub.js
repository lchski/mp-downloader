const { PubSub } = require('@google-cloud/pubsub');

const pubsub = new PubSub();

module.exports.publishMessageToPubSub = async (topicName, message) => {
    const dataBuffer = Buffer.from(JSON.stringify(message));

    const messageId = await pubsub.topic(topicName).publish(dataBuffer);
    
    return messageId;
};
