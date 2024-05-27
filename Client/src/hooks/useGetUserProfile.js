import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

const useGetUserProfile = (name) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/users/getUserInfo/${name}`);
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                if (data.isFrozen) {
                    setUser(null);
                    return;
                }
                setUser(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, [name, showToast]);

    return { loading, user };
};

export default useGetUserProfile;