import mongoose, { Schema, model, Document, models, Date } from "mongoose";

export interface IStreamProps extends Document {
    _id:Schema.Types.ObjectId;
    creatorName: string;
    streamName: string;
    address:string;
    price:string;
    isFree:boolean;
    streamDate:Date;
    endTime:string;
    desc:string;
    participant:string;
    organizers:string;

    thumbnailVideoUrl: string ;
    thumbnailImageUrl: string ;

    ingressId: String;
    serverUrl: String ;
    streamKey: String ;


    accName: String;
    accBank: String ;
    accNumber: String ;
    

    isLive: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
    subscribers: string[];

}

const StreamDataSchema = new Schema<IStreamProps>({
    creatorName: { type: String, unique: true, ref: 'User', required: true  },
    streamName: { type: String,   },
    address: { type: String , default:''},
    price: { type: String ,},
    isFree: { type: Boolean ,}, 
    streamDate: { type: Date },
    endTime: { type: String , },
    desc: { type: String , default:''},
    participant: { type: String , default:''},
    organizers: { type: String , default:''},
    thumbnailVideoUrl: { type: String , },
    thumbnailImageUrl: { type: String , },

    ingressId: { type: String, unique: true ,default:'' },
    serverUrl: { type: String, },
    streamKey: { type: String, },

    accNumber: { type: String, unique: true ,default:'' },
    accBank: { type: String,default:'' },
    accName: { type: String, default:''},

    isLive: { type: Boolean, default: false },
    isChatEnabled: { type: Boolean, default:true }, 
    isChatDelayed: { type: Boolean,  default: false }, 
    isChatFollowersOnly: { type: Boolean,  default: false } ,
    subscribers: [{ type:String, ref: 'Subscribers', default: [] }], 



});

const StreamData = models.StreamData || model('StreamData', StreamDataSchema);

export default StreamData;

// export default mongoose.model<IStreamProps>('StreamData', StreamDataSchema);
