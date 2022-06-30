import { useState } from "react";
import { useParams } from "react-router-dom";
import usePets from "../../../hooks/usePets";
import Pet from "../../../services/dto/Pet";
import { getPetById, modifyPet } from "../../../services/firebase";
import ErrorModal from "../../Modal/ErrorModal";
import LoadingModal from "../../Modal/LoadingModal";
import NavButton from "../../NavButton/NavButton";
import PetDetails from "./PetDetails/PetDetails";
import PetDetailsEdit from "./PetDetails/PetDetailsEdit";
import PetDetailsSkeleton from "./PetDetails/PetDetailsSkeleton";

const PetProfile = () => {

    const { id } = useParams();
    const { pets, loading, error, update } = usePets<Pet>(getPetById, id)
    const [editMode, setEditMode] = useState<boolean>(false)

    return <>
        {(error) && <ErrorModal error={error}>
            <NavButton variant="outlined" to="/kutyak">
                Vissza a kereséshez
            </NavButton>
        </ErrorModal>}

        {(loading) && <LoadingModal />}

        {(pets) ? (editMode) ? <PetDetailsEdit pet={pets} closeFn={() => setEditMode(false)} saveFn={(args: Pet) => { modifyPet(args).then(() => { setEditMode(false); update(); }); }} />
            : <PetDetails pet={pets} setEditMode={setEditMode} />
            : <PetDetailsSkeleton />}
    </>
}

export default PetProfile;