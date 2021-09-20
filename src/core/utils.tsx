export const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;
  
    if (!email || email.length <= 0) return 'Email cannot be empty.';
    if (!re.test(email)) return 'Ooops! Você precisa informar um email valido!.';
  
    return '';
  };
  
  export const passwordValidator = (password: string) => {
    if (!password || password.length <= 0) return 'Password Não pode ser vazio!.';
  
    return '';
  };
  
  export const nameValidator = (name: string) => {
    if (!name || name.length <= 0) return 'Não pode ser vazio.';
  
    return '';
  };