import axios from 'axios';
import {useToast} from 'vue-toast-notification';
const $toast = useToast();

const userService = {
    async login(email, password) {
      try {
        const response = await axios.post(`${process.env.API_BASE_URL}auth/signin`, { email, password });
        console.log("🚀 ~ file: auth.js:23 ~ login ~ response.data:", response.data)
        return response.data;
      } catch (error) {
        console.log("activateUser:function ~ error:", error.response.data.message);
        switch (error.response.data.message) {
          case 'Invalid credentials':
              $toast.error('Usuario o contraseña incorrectos');
              break;
          case 'User not found':
              $toast.error('Usuario no encontrado');
              break;
          case 'USER_DELETED':
              $toast.error('Usuario eliminado');
              break;
          case 'User not validated':
              $toast.error('Usuario no validado');
              break;
          case 'USER_PENDING_PASSWORD_RESET':
              $toast.error('Usuario pendiente de reseteo de contraseña');
              break;
          default:
              $toast.error('Ups! Algo salio mal');
              break;
      }
      }
    },
  };

export default userService;