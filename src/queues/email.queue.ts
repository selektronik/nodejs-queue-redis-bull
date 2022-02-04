import Bull from 'bull';
import emailProcess from '../processes/email.process';
import {setQueues, BullAdapter} from 'bull-board';


const emailQueue = new Bull('email', {
    redis: {
      host: process.env.REDIS_URL
    }
  });

setQueues([
    new BullAdapter(emailQueue)
]);

emailQueue.process(emailProcess);

const sendNewEmail = (data: any) => {
    console.log("Email sending to user...");
    emailQueue.add(data, {
        attempts: 5
    });
};

export {
    sendNewEmail
}