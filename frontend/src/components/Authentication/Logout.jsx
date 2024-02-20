import {useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await fetch('/api/v1/logout', {
                method: 'POST',
                credentials: 'include', // Include cookies in the request
            });
            // Redirect to the login page or perform any other action after logout
            navigate("/");
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Logout