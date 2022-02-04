import Bull from 'bull';
import {setQueues, BullAdapter} from 'bull-board';
import smsProcess from '../processes/sms.process';



const smsQueue = new Bull('sms', {
    redis: {
      host: process.env.REDIS_URL
    }
  });

setQueues([
    new BullAdapter(smsQueue)
]);

smsQueue.process(smsProcess);

const sendNewSms = (data: any) => {
    console.log("Sms sending to user...");
    smsQueue.add(data, {
        attempts: 5
    });
};

export {
    sendNewSms
}