import mongoose, { Schema, model, Document, models } from "mongoose";


export interface ISubscribers extends Document {
    StreamId:string;
    SubscriberId: string;
    createdAt: Date;
}

const SubscriberSchema = new Schema<ISubscribers>({
    StreamId: { type: String, ref: 'User',  },
    SubscriberId:[ { type:  String, ref: 'User',}],
    createdAt: { type: Date, default: Date.now },
});

const Subscribers = models.Subscribers || model('Subscribers', SubscriberSchema);

export default Subscribers;
