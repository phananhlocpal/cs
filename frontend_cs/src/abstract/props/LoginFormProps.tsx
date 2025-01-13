export interface LoginFormProps {
    onSubmitLogin: (credentials: { email: string; password: string }) => void;
}