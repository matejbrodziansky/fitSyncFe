import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { response } from "express";
import { Alert } from "react-native";

export const api = axios.create({
  baseURL: "https://lenient-filly-magnetic.ngrok-free.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const getCurrentUser = async () => {
  const token = await getToken();
  if (!token) {
    console.log("Token neexistuje, používateľ nie je prihlásený.");
    return null;
  }

  try {
    const response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      const errorMessage = error.response.data?.message;

      if (errorMessage === "Expired JWT Token") {
        console.log("Token vypršal Pokus o obnovu ");

        const refreshed = await refreshToken();
        if (refreshed) {
          return getCurrentUser();
        } else {
          console.error("Obnova tokenu zlyhala. Prosím, prihláste sa znova.");
          singOut();
        }
      }
      console.error("Prihlásenie vypršalo. Prosím, prihláste sa znova.");
    } else {
      console.error("Neočakávaná chyba pri získavaní používateľa:", error);
    }
    return null;
  }
};

interface User {
  'email': string;
  'password': string;
}

export const registerUser = async (formData: User) => {
  try {
    const response = await api.post("/register", formData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync('authToken', token);
    console.log("Token uložený bezpečne.");
  } catch (error) {
    console.error("Nepodarilo sa uložiť token:", error);
  }
};
export const saveRefreshToken = async (refreshToken: string) => {
  try {
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    console.log("Refresh token uložený bezpečne.");
  } catch (error) {
    console.error("Nepodarilo sa uložiť refresh token:", error);
  }
};

export const refreshToken = async () => {

  const refreshToken = await getRefreshToken()
  if (!refreshToken) {
    console.log("Refresh token neexistuje. Používateľ nie je prihlásený.");
    return false;
  }

  try {
    const response = await api.post('/token/refresh', {
      refresh_token: refreshToken
    })

    await saveToken(response.data.token)
    await saveRefreshToken(response.data.refresh_token)

    return true;
  } catch (error) {
    console.error("Chyba pri obnove tokenu:", error);
    return false;
  }

}




export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync('authToken');
    console.log("Token odstránený.");
  } catch (error) {
    console.error("Nepodarilo sa odstrániť token:", error);
  }
};


export const getToken = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      console.log("Token načítaný:", token);
      return token;
    } else {
      console.log("Token neexistuje.");
      return null;
    }
  } catch (error) {
    console.error("Nepodarilo sa načítať token:", error);
    return null;
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    return refreshToken;
  } catch (error) {
    console.error("Nepodarilo sa načítať refresh token:", error);
    return null;
  }
};


export const signIn = async (credentials) => {

  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await api.post("/check-email", { email });
    return response.data;
  } catch (error) {
    console.error("Email check failed:", error);
    throw error;
  }
}

export const singOut = async () => {
  try {
    await deleteToken();
  } catch (error) {
    console.error("Failed to sign out:", error);
    throw error;
  }
}


export const getAllPosts = async () => {
  return [
    {
      $id: '1',
      title: 'Video 1',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
      },
    },
    {
      $id: '2',
      title: 'Video 2',
      thumbnail: 'https://barbend.com/wp-content/uploads/2022/02/Barbend-Featured-Image-1600x900-Best-Mobility-Exercises-for-Better-Movement.jpg',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://barbend.com/wp-content/uploads/2022/02/Barbend-Featured-Image-1600x900-Best-Mobility-Exercises-for-Better-Movement.jpg',
      },
    },
    {
      $id: '3',
      title: 'Video 3',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jBeObLDAAfv7GfUoSgIdS50nGhFc30qZYe9v_7fhwEgbfVCkabf-wYyiQbVF3TMWN1s&usqp=CAU',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazesAudio.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jBeObLDAAfv7GfUoSgIdS50nGhFc30qZYe9v_7fhwEgbfVCkabf-wYyiQbVF3TMWN1s&usqp=CAU',
      },
    },
    {
      $id: '4',
      title: 'Video 4',
      thumbnail: 'https://manualpt.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-21-at-11.57.35-AM.png',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyridesVideo.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://manualpt.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-21-at-11.57.35-AM.png',
      },
    },
  ];
}

export const getLatestPosts = async () => {
  return [
    {
      $id: '1',
      title: 'Video 1',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
      },
    },
    {
      $id: '2',
      title: 'Video 2',
      thumbnail: 'https://barbend.com/wp-content/uploads/2022/02/Barbend-Featured-Image-1600x900-Best-Mobility-Exercises-for-Better-Movement.jpg',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://barbend.com/wp-content/uploads/2022/02/Barbend-Featured-Image-1600x900-Best-Mobility-Exercises-for-Better-Movement.jpg',
      },
    },
    {
      $id: '3',
      title: 'Video 3',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jBeObLDAAfv7GfUoSgIdS50nGhFc30qZYe9v_7fhwEgbfVCkabf-wYyiQbVF3TMWN1s&usqp=CAU',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazesAudio.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8jBeObLDAAfv7GfUoSgIdS50nGhFc30qZYe9v_7fhwEgbfVCkabf-wYyiQbVF3TMWN1s&usqp=CAU',
      },
    },
    {
      $id: '4',
      title: 'Video 4',
      thumbnail: 'https://manualpt.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-21-at-11.57.35-AM.png',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyridesVideo.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://manualpt.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-21-at-11.57.35-AM.png',
      },
    },
  ];
}

export const searchPosts = async () => {
  return [
    {
      $id: '1',
      title: 'Video 1',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMBRMbfWhJN6dntlH5VGaEFMNinBvz3ZgXsg&s',
      },
    },
    {
      $id: '2',
      title: 'Video 2',
      thumbnail: 'https://barbend.com/wp-content/uploads/2022/02/Barbend-Featured-Image-1600x900-Best-Mobility-Exercises-for-Better-Movement.jpg',
      video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      creator: {
        username: 'JSMastery',
        avatar: 'https://barbend.com/wp-content/uploads/2022/02/Barbend-Featured-Image-1600x900-Best-Mobility-Exercises-for-Better-Movement.jpg',
      },
    },

  ];
}

