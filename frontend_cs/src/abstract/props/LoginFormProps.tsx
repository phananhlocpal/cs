export interface LoginFormProps {
    onSubmitLogin: (credentials: { email: string; password: string, checked: boolean }) => void;
}