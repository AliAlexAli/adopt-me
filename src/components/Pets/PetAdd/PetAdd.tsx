import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import AuthContext from "../../../context/AuthContext";
import Pet from "../../../services/dto/Pet";
import { addPet } from "../../../services/firebase";
import PetDetailsEdit from "../PetProfile/PetDetails/PetDetailsEdit";

const PetAdd = () => {
    const userId = useContext(AuthContext).user?.id
    const navigate = useNavigate()

    const pet: Pet = {
        birth: new Date(),
        date: new Date(),
        description: "",
        id: uuid(),
        image: "",
        name: "",
        owner: userId || "",
        sex: "Szuka",
        size: "Kicsi"
    }

    return <PetDetailsEdit pet={pet} closeFn={() => navigate("/kutyaim")} saveFn={(args: Pet) => { addPet(args).then(() => navigate("/kutyaim")) }} />
}
export default PetAdd;