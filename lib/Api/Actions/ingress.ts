// 'use server'


// import { TrackSource, IngressAudioEncodingPreset, IngressInput, IngressClient, IngressVideoEncodingPreset, RoomServiceClient, type CreateIngressOptions, CreateOptions, IngressAudioOptions, IngressVideoOptions } from 'livekit-server-sdk';
// // import StreamData from '@/lib/database/models/streamData.models';
// // import { connectToDatabase } from '@/lib/database';
// // import { getLoginUser } from '@/lib/auth-service';
// import { revalidatePath } from 'next/cache';
// import { getLoginUser } from '../Services/auth.service';
// import { connectToDatabase } from '../Database';
// import StreamData from '../Database/models/streamData.models';


// const roomService = new RoomServiceClient (
//     process.env.LIVEKIT_API_KEY!,
//     process.env.LIVEKIT_API_URL!,
//     process.env.LIVEKIT_SECRET_KEY!,
// )
// if (!roomService) {
//     throw new Error("Failed to initialize RoomServiceClient");
//  }


// const ingressClient = new IngressClient( 
//     process.env.LIVEKIT_API_URL!,
//     process.env.LIVEKIT_API_KEY!,
//    process.env.LIVEKIT_SECRET_KEY!,
//    );
// if (!ingressClient) {
//     throw new Error("Failed to initialize IngressClient");
// }

// console.log(ingressClient)






//  export const createIngress = async (ingressType: IngressInput) => {
//     const loggedInUser = await getLoginUser();

//     console.log(loggedInUser)

//     await restIngresses(loggedInUser._id)

//     const options: CreateIngressOptions = {
//         name: loggedInUser.displayName,
//         roomName: loggedInUser._id,
//         participantIdentity: loggedInUser._id,
//         participantName: loggedInUser.displayName
//     };

//     console.log('option',options)

//     if (ingressType === IngressInput.WHIP_INPUT) {
//         options.bypassTranscoding = true;
//     } else {

//         options.video = new IngressVideoOptions();
//         options.video.name = `${loggedInUser.displayName} video player`;
//         options.video.source = TrackSource.CAMERA;
//         options.video.encodingOptions = {
//             case: "preset",
//             value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS_HIGH_MOTION
//         };

//         options.audio = new IngressAudioOptions(); 
//         options.audio.name =  `${loggedInUser.username} audio player` ;
//         options.audio.source = TrackSource.MICROPHONE;
//         options.audio.encodingOptions = {
//             case: "preset",
//             value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
//         };
//     }

//     console.log(ingressType)


//     const ingress = await ingressClient.createIngress(ingressType, options);

//     console.log('Ingress :', ingress);
//     console.log('Ingress URL:', ingress.url);



//     if (!ingress || !ingress.url || !ingress.streamKey) {
//         throw new Error("Failed to create ingress");
//     }

//     await connectToDatabase();
//     console.log('Updating stream data with:', {
//         ingressId: ingress.ingressId,
//         serverUrl: ingress.url,
//         streamKey: ingress.streamKey
//     });
//     await StreamData.findOneAndUpdate({ ingressId: ingress.ingressId, serverUrl: ingress.url, streamKey: ingress.streamKey });

//     revalidatePath(`/u/${loggedInUser.displayName}/keys`);

//     return ingress;
// };


// export const restIngresses = async (hostIdentity:string) => {
//     const ingresses = await ingressClient.listIngress({
//         roomName:hostIdentity,
//     })

//     const rooms = await roomService.listRooms([hostIdentity]);

//     for (const room of rooms) {
//         await roomService.deleteRoom(room.name);
//     }

//     for(const ingress of ingresses){
//         if (ingress.ingressId) {
//             await ingressClient.deleteIngress(ingress.ingressId)
//         }
//     }

// } 



'use server'


import { TrackSource, IngressAudioEncodingPreset, IngressInput, IngressClient, IngressVideoEncodingPreset, RoomServiceClient, type CreateIngressOptions, CreateOptions, IngressAudioOptions, IngressVideoOptions } from 'livekit-server-sdk';
// import StreamData from '@/lib/database/models/streamData.models';
// import { connectToDatabase } from '@/lib/database';
// import { getLoginUser } from '@/lib/auth-service';
import { revalidatePath } from 'next/cache';
import { getLoginUser } from '../Services/auth.service';
import { connectToDatabase } from '../Database';
import StreamData from '../Database/models/streamData.models';


const roomService = new RoomServiceClient(
process.env.LIVEKIT_API_URL!,
 process.env.LIVEKIT_API_KEY!,
process.env.LIVEKIT_SECRET_KEY!,

);

if (!roomService) {
   throw new Error("Failed to initialize RoomServiceClient");

    
}

const ingressClient = new IngressClient( 
    // process.env.NEXT_PUBLIC_LIVEKIT_URL!,
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
   process.env.LIVEKIT_SECRET_KEY!,
   );
if (!ingressClient) {
    throw new Error("Failed to initialize IngressClient");
}

export const createIngress = async (ingressType: IngressInput) => {
    const loggedInUser = await getLoginUser();

    await restIngresses(loggedInUser._id)

    const options: CreateIngressOptions = {
        name: loggedInUser.displayName,
        roomName: loggedInUser._id,
        participantIdentity: loggedInUser._id,
        participantName: loggedInUser.displayName
    };

    if (ingressType === IngressInput.WHIP_INPUT) {
        options.bypassTranscoding = true;
    } else {

        options.video = new IngressVideoOptions();
        options.video.name = `${loggedInUser.displayName} video player`;
        options.video.source = TrackSource.CAMERA;
        options.video.encodingOptions = {
            case: "preset",
            value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS_HIGH_MOTION
        };

        options.audio = new IngressAudioOptions(); 
        options.audio.name =  `${loggedInUser.displayName} audio player` ;
        options.audio.source = TrackSource.MICROPHONE;
        options.audio.encodingOptions = {
            case: "preset",
            value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
        };
    }

    const ingress = await ingressClient.createIngress(ingressType, options);

    if (!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error("Failed to create ingress");
    }

    await connectToDatabase();
    await StreamData.findOneAndUpdate({ ingressId: ingress.ingressId, serverUrl: ingress.url, streamKey: ingress.streamKey });

    revalidatePath(`/Dashboard/${loggedInUser.displayName}/keys`);

    return ingress;
};

export const restIngresses = async (hostIdentity:string) => {
    const ingresses = await ingressClient.listIngress({
        roomName:hostIdentity,
    })

    const rooms = await roomService.listRooms([hostIdentity]);

    for (const room of rooms) {
        await roomService.deleteRoom(room.name);
    }

    for(const ingress of ingresses){
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }

} 


