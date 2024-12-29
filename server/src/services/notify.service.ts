import admin from 'firebase-admin';
import { Message, getMessaging } from "firebase-admin/messaging";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { FRONTEND_URL } from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccount = {
    "type": "service_account",
    "project_id": "nexync-zenith",
    "private_key_id": "e56cbe5b8afb68f7ea1f9dfd0aa1c665345c3bbf",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkHis6svrNE095\nIOcFkuwndO6AYtUTi4QCliNuZuFLqTZ3ELqdqT4pqDrTX0BW2h5l9zxKKbs3TsQv\nkRhuw63uOsyu46BUZ/TMi6LLJzb7cX/hdrP7h/cSGvBrwFisx6XVrmiTFFDUaIqI\n7aATAXzMII9LXYjU73Ctzr1hnIyBtpyzA0pebk7/jRIvlj3GJuN9DiQc2Q850SS9\n8HNJC0MWzGy6hw1cCpX27a7hilVJX8H+/63PaovLms0VaxvlIAfgEg4QV9NTNRoB\nIHgS6/DdxPZO7p39VYxvbCMIykKBCCvz7jf0IW9aIn5JZapBz2OoCuSjnCCVO4ur\nx5iAs0/9AgMBAAECggEAH4NLebH0Rnx2viN7OK7Fea4SPcS8dUxMxNJfa0uF5ylO\ns/4aVzuwG/+ZjAy2Jfcr7xhSE0uAD1aohRmvP1WDiELyGoLKvmpXrw8A61FUVWOt\n0nUgiiPJZUiW8Zm1bTfIuAcNPXChNKf+Mdyu5/dZJzj5Stdi9sAjOrx/0MZmlGFV\naWNoxiJvd4xKF2Q3WmITyxUuY/03jTPg/M/rIpaoyHcIJ8JdGwyYbkMSZ0Vm/ibl\nsvF3HI7Uah2pEGbI9ElVOTt1YomyqDnkjnin8KroZgrwL9AA7cX96HyVq5geI6+Z\n/a+BjTH3H1zeiYrZaUH88gkOpkNnTpbSDreWHKt1AQKBgQDRYaPzEcpYjTXcKpHV\nmR8sUbM1nLfdBPEYRiWuHW2yosxz0clqrz9vdf5Tpwm71aExKZXXeoh5rKGA/hwL\npc+wSOa21YuI9MuNCo8pBPcGEZNNW3FpmRcqqUi192tIqJo5hAMq0mDIg08/6tq7\n7TG5F8w+CofogpGyUSG0J407NQKBgQDIqJZ30TalW84lLo1NWetFoVOT/V73uzvf\n3IN9BdJjY+RK9TiSnZ+gV7BcKEdZGFLpfjLJg8vBN4GdLZuwfW+4sqjYp15UvtQN\nXNQ62NftODCOh79DvCYOzeZFWqbf5DFz4C7E8IgXRRYDKXWNFmCsRZW0xU3hc4kf\ntepPWUeSqQKBgQCTrqvmGUlAljFEHl6Iax06tFGT4fspkH/BIFEZczZZhkxw8KqB\nbiRvKKl/NVU/QFoWg/9lYc77C1FK23DKomRQMctRcGOf8RHVZHo/c3oMtL7SFEp1\nMf7OH2LiviXUtN867CsTvBl5tGxkZ/FqFc45gFiV9fWQgO/k9yavnCoYdQKBgA0N\nYlRC6KIS+bLTd1+LtNEfsFcVCSNmK3vhVTBBu7C5Y7U4hEiNNj/w1Ej6WcHC4knL\n6rPO/ecAnE7EE7eEQUsrW+5T3L/4dcS0wB1f05PbrtTmoZtfVr5pyEvEnMw9hLX7\n5C7tUnzpAoiMHthhl0I9eIJ8vxcmM8o7RBWLQiuZAoGACCm4CecuLpe00lO3LcwT\nBAIUqZtPAtIDnNr0VMBjhsENvoQ2l4Kj5wP/9W3Op26yD5irthhcyIQfvakGPrnM\njF+tVtnjJxVYRWcsKpBN7vZ7H6fqEp5aR1EPH5BnqMenL8Zr8/zbW9fpfbgeX/Us\nCIlIjo6W1HthSHfSehB69HE=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-1678h@nexync-zenith.iam.gserviceaccount.com",
    "client_id": "116256521364423510596",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1678h%40nexync-zenith.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

class NotifyService {

    private messaging: admin.messaging.Messaging;
    constructor() {
        this.messaging = this.initFirebase();
    }

    // Initialize Firebase Admin SDK
    private initFirebase(): admin.messaging.Messaging {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
            });
        }
        return admin.messaging();
    }

    // Method to send notifications
    async sendNotification({
        title,
        body,
        token,
    }: {
        title: string;
        body: string;
        token: string;
    }) {
        try {
            console.log("Preparing to send notification:", { title, body, token });

            const payload: Message = {
                token: token, 
                notification: {
                    title,
                    body,
                },
                webpush: FRONTEND_URL
                    ? {
                        fcmOptions: {
                            link: FRONTEND_URL,
                        },
                    }
                    : undefined,
            };

            const response = await admin.messaging().send(payload);
            console.log("Notification sent successfully:", response);
            return { success: true, message: "Notification sent", response };
        } catch (error) {
            console.error("Error sending notification:", error);
            return { success: false, error };
        }
    }
}

export default new NotifyService();
