import { get, getDatabase, ref, set, update } from "firebase/database";
import { translate } from "./translations/translation";
import { db } from "./firebase";
import { OPENAI_API_KEY } from "./config";

// This file is for CRUD functions related to the database and for OPENAI API actions.



// Adds experiment to firebase's realtime database
export const addExperimentToDatabase = async (expId, subject, grade, title, tools, materials, instructions, precautions, explanation) => {
    try {
        await set(ref(db, 'experiments/' + expId), {
            subject: subject,
            grade: grade,
            title: title,
            tools: tools,
            materials: materials,
            instructions: instructions,
            precautions: precautions,
            explanation: explanation
        });
        console.log('JihadLabs: Experiment added successfully');
    } catch (error) {
        console.error('JihadLabs: Error adding experiment:', error);
    }
};


// Gets all experiments
export const getAllExperiments = async () => {
    const experimentsRef = ref(db, "experiments/");
    try {
        const snapshot = await get(experimentsRef);
        if (snapshot.exists()) {
            const experiments = [];
            snapshot.forEach((childSnapshot) => {
                experiments.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            return experiments;
        } else {
            console.log("JihadLabs: No experiments found");
            return [];
        }
    } catch (error) {
        console.error("JihadLabs: Error getting experiments:", error);
        return [];
    }
};

// uses above function to retrieve all experiments and picks one at random using Math.random
export const getRandomExperiment = async () => {
    const all_experiments = await getAllExperiments();
    return all_experiments[Math.floor(Math.random() * all_experiments.length)];
};

export const getExperimentById = async (id) => {
    const experimentsRef = ref(db, `experiments/${id}`);
    try {
        const snapshot = await get(experimentsRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("JihadLabs: Couldn't find experiment");
            return null;
        }
    } catch (error) {
        console.error("JihadLabs: Error getting experiment:", error);
        return null;
    }
};

export const updateExperiment = async (id, experiment) => {
    const experimentsRef = ref(db, 'experiments/' + id);
    return await update(experimentsRef, experiment);
}

export const updateUserInformation = async (uid, userInformation) => {
    const userRef = ref(db, 'users/' + uid);
    return await update(userRef, userInformation);
}

export const generateUniqueKey = (length) => {

    // allowed characters (62)
    // the app will work fine for the first 62^8 experiments xD (JK)
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        key += characters[randomIndex];
    }

    return key;
};


// The holy grail of the code, the function uses OPENAI api
export const fetchExperimentByAPI = async (subject, grade) => {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const prompt = `Generate an experiment idea for a ${grade} grade ${subject} experiment in Arabic. Provide the following details in JSON format and make sure each value of a key is one sentence max:\n\n"subject": ${translate(subject, "ar")},\n"grade": ${translate(grade, "ar")},\n"title": "",\n"tools": "",\n"materials": "",\n"instructions": "",\n"precautions": "",\n"explanation": ""`;

    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: prompt }
        ]
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    return fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {

            // I used regular expressions here.
            // I know it may seem like an overkill, BUT I tried it without, and sometimes, 
            // GPT likes to throw some random characters or words that break the JSON parsing
            // Such as: "Oh here is the answer + JSON"
            // This is probably the safest option out there.
            const choices = result.choices[0].message.content;
            const titleMatch = /"title": "(.*?)"/.exec(choices);
            const toolsMatch = /"tools": "(.*?)"/.exec(choices);
            const materialsMatch = /"materials": "(.*?)"/.exec(choices);
            const instructionsMatch = /"instructions": "(.*?)"/.exec(choices);
            const precautionsMatch = /"precautions": "(.*?)"/.exec(choices);
            const explanationMatch = /"explanation": "(.*?)"/.exec(choices);

            const generatedExperiment = {
                subject: translate(subject, "ar"),
                grade: translate(grade, "ar"),
                title: titleMatch ? titleMatch[1] : '',
                tools: toolsMatch ? toolsMatch[1] : '',
                materials: materialsMatch ? materialsMatch[1] : '',
                instructions: instructionsMatch ? instructionsMatch[1] : '',
                precautions: precautionsMatch ? precautionsMatch[1] : '',
                explanation: explanationMatch ? explanationMatch[1] : ''
            };
            return generatedExperiment;
        })
        .catch(error => {
            console.error('Error:', error);
            return 'An error occurred.';
        });
}

export const UserExists = async (uid) => {
    const userRef = ref(db, 'users/' + uid);
    try {
        const snapshot = await get(userRef);
        return snapshot.exists();
    } catch (error) {
        console.error("JihadLabs: Error checking for user:", error);
        return false;
    }
};

export const getUserInformation = async (uid) => {
    const userRef = ref(db, 'users/' + uid);
    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.error("JihadLabs: user probably does not exist:", error);
        }
    } catch (error) {
        console.error("JihadLabs: Error getting user:", error);
        return false;
    }
};

export const addUser = async (uid) => {
    await set(ref(db, 'users/' + uid), {
        name: '',
        favorites: ''
    });
}

export const inFavorites = async (uid, expId) => {
    const userExpRef = ref(db, `users/${uid}/favorites/${expId}`);
    const snapshot = await get(userExpRef);
    return snapshot.exists();
}

export const addToFavorites = async (uid, expId, expTitle) => {
    const userExpRef = ref(db, `users/${uid}/favorites/${expId}`);
    await set(userExpRef, expTitle);
};

export const removeFromFavorites = async (uid, expId) => {
    const userExpRef = ref(db, `users/${uid}/favorites/${expId}`);
    const snapshot = await get(userExpRef);
    if (snapshot.exists()) {
        await set(userExpRef, null); // for some reason .remove() isn't working
        // set(anyRef, null) does the job according to the documention.
    }
};

export const getAllFavorites = async (uid) => {
    const userFavoritesRef = ref(db, `users/${uid}/favorites/`);
    const snapshot = await get(userFavoritesRef);
    if (snapshot.exists()) {
        return snapshot.val();
    }
    return null; // no favorites;
};

export const likeExperiment = async (uid, expId) => {
    const ExpLikeRef = ref(db, `experiments/${expId}/likes/${uid}`);
    await set(ExpLikeRef, true);
};

export const removeLikeExperiment = async (uid, expId) => {
    const ExpLikeRef = ref(db, `experiments/${expId}/likes/${uid}`);
    const snapshot = await get(ExpLikeRef);
    if (snapshot.exists()) {
        await set(ExpLikeRef, null);
    }
};

export const getNumberOfLikes = async (expId) => {
    const ExpLikeRef = ref(db, `experiments/${expId}/likes`);
    const snapshot = await get(ExpLikeRef);
    if (snapshot.exists()) {
        return snapshot.size;
    } else {
        return 0;
    }
};

export const isLiked = async (uid, expId) => {
    const ExpLikeRef = ref(db, `experiments/${expId}/likes/${uid}`);
    const snapshot = await get(ExpLikeRef);
    return snapshot.exists();
};