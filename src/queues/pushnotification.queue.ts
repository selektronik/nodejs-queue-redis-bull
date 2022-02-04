import Bull from 'bull';
import {setQueues, BullAdapter} from 'bull-board';
import pushNotificationProcess from '../processes/pushNotification.process';


const pushNotificationQueue = new Bull('pushNotification', {
    redis: {
      host: process.env.REDIS_URL
    }
  });

setQueues([
    new BullAdapter(pushNotificationQueue)
]);

pushNotificationQueue.process(pushNotificationProcess);

const sendNewPushNotification = (data: any) => {
    console.log("PushNotification sending to user...");
    pushNotificationQueue.add(data, {
        attempts: 5
    });
};

export {
    sendNewPushNotification
}