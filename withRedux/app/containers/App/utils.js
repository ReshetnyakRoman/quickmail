import { showInfoMessage } from './actions';

/*
 * auxiliary functions to shorten popUpInfoMessage handeling.
 * messageID - response for message text it's equal to messageID from messages.js
 * possible messageTypes: warning, success, info, error
 * timeout - after that time message will fade
*/

const msgProps = (messageType, messageID, timeout = 2000, msgParametr) => ({
  messageType,
  messageID,
  timeout,
  msgParametr,
});

/*
 * 3 below functions used to execute showInfoMessage action in functions like ApplyFn(fn, args)
 * it used in Mailbox saga to apply set of actions in a row.
*/
const saccessMessage = (messageID, msgParametr) => ({
  action: showInfoMessage,
  args: [msgProps('success', messageID, 1500, msgParametr)],
});

const warningMessage = (messageID, msgParametr) => ({
  action: showInfoMessage,
  args: [msgProps('warning', messageID, 2500, msgParametr)],
});

const errorMessage = (messageID, msgParametr) => ({
  action: showInfoMessage,
  args: [msgProps('error', messageID, 2500, msgParametr)],
});

export { msgProps, saccessMessage, warningMessage, errorMessage };
