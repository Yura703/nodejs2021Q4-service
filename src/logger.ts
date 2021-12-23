import pino from 'pino';
import path from 'path';

const transport = pino.transport({
    targets: [
//         {
//             level: 'info',
//             target: 'pino/file',
//   options: { destination: '/log.log', mkdir: true, append: true }
//         }, 
        {
            level: 'info',
            target: path.resolve(__dirname,'../log.log'),
            options: {
            }
        }
    ]
});

export default pino(transport);
