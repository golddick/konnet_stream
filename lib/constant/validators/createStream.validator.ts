import * as z from 'zod';

export const CreateStreamSchema = z.object({
  streamName: z.string({
      message:'Add stream Name'
    }),
    desc: z.string({
      message:'Add stream Desc'
    }),
    address: z.string({
      message:'Streaming location needed'
    }),
    // endTime: z.string(),
    // streamDate: z.date(),
    price: z.string(),
    isFree: z.boolean(),
    participant: z.string(),
    organizers: z.string(),
    // eventImg: z.string(),
    // thumbVideo: z.string(),
  
  
    // email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    //   message: "Invalid email format",
    // }),
    // creatorName: z.string(),
  
  
    // streamRMTPurl: z.string(),
    // streamRMTPkey: z.string(),
  
    accBank: z.string(),
   accName: z.string(),
   accNumber: z.string(),
  
    
  });
  