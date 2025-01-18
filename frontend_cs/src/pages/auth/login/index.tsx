import { LoginFormComponent } from "./components";
import { Flex } from "@chakra-ui/react";
import { loginCustomer, loginUser } from "@/services"
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();

    const onSubmitLogin = async ({ email, password, checked }: { email: string; password: string, checked: boolean }) => {
        if (checked) {
            const response = await loginUser({ email, password });
            if (response.user) {
                navigate("/home");
            } else {
                alert("Invalid credentials");
            }
        } else {
            const response = await loginCustomer({ email, password });
            if (response.customer) {
                navigate("/customer-demo");
            } else {
                alert("Invalid credentials");
            }
        }
        
    }

    return (
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <LoginFormComponent onSubmitLogin={onSubmitLogin} />
        </Flex>
    );
};


