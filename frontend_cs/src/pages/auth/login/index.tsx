import { LoginFormComponent } from "./components";
import { Flex } from "@chakra-ui/react";
import { loginUser } from "../../../services"
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();

    const onSubmitLogin = async ({ email, password }: { email: string; password: string }) => {
        const response = await loginUser({ email, password });
        if (response.user) {
            navigate("/home");
        } else {
            alert("Invalid credentials");
        }
    }

    return (
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <LoginFormComponent onSubmitLogin={onSubmitLogin} />
        </Flex>
    );
};


