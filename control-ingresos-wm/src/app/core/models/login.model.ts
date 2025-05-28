// src/app/models/login.model.ts

/**
 * Interfaz para los datos de solicitud de login que se envían al backend.
 * Basado en tu `login.component.ts` y la autenticación estándar de Laravel.
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Interfaz para la respuesta exitosa del login que se recibe del backend.
 * Incluye los datos del usuario de la tabla `users` y la información de Spatie.
 */
// src/app/models/login.model.ts

export interface UsuarioLoginResponse {
  // ... tus otros campos de usuario
  //token: string; // Elimina o comenta esta línea
  access_token: string; // Agrega esta línea, coincidiendo con el backend
  token_type: string; // Agrega esto para tipar
  expires_in: number; // Agrega esto para tipar
  user: { // El backend devuelve el usuario anidado en una propiedad 'user'
    id: number;
    name: string;
    email: string;
    organismo_id: number;
    status: boolean;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
    // Agrega aquí los campos de roles y permissions si el backend los envía dentro de 'user' o fuera
    // Si roles y permissions están fuera de 'user', manténlos al nivel superior de UsuarioLoginResponse
  };
  roles?: string[]; // Si los roles vienen fuera de 'user'
  permissions?: string[]; // Si los permisos vienen fuera de 'user'
  // message?: string; // Si hay un mensaje de éxito
}