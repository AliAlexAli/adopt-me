import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { testData } from "./testData";

beforeEach(async () => {
    render(<App/>);

    act(() => {
        fireEvent.click(screen.getAllByText("Bejelentkezés")[0]);
    });

    const emailInput = screen.getByLabelText('Email', {exact: false})
    const passwordInput = screen.getByLabelText('Jelszó', {exact: false})

    fireEvent.change(emailInput, {
        target: {value: testData.email},
    })

    fireEvent.change((passwordInput), {
        target: {value: testData.password},
    })

    await act(async () => {
        fireEvent.click(screen.getByTestId("submit-login"));
    });
})

test("Upload pet", async () => {
    const myPets = (await screen.findAllByText("Kutyáim"))[0];

    act(() => {
        fireEvent.click(myPets);
    });

    act(() => {
        fireEvent.click(screen.getByTestId("add-pet"));
    });

    act(() => {
        fireEvent.change((screen.getByLabelText('Név', {exact: false})), {
            target: {value: testData.petName},
        })
    });

    act(() => {
        fireEvent.change((screen.getByLabelText('Leírás', {exact: false})), {
            target: {value: testData.petDescription},
        })
    });

    await act(async () => {
        fireEvent.click(screen.getByTestId("submit-upload"));
        await new Promise(resolve => setTimeout(resolve, 1000))
    });


    await act(async () => {
        fireEvent.click(screen.getByText("Tovább"));
        await new Promise(resolve => setTimeout(resolve, 1000))
    });

    expect(screen.getByText(testData.petName))
    expect(screen.getByText(testData.petDescription))
});

test("Edit pet", async () => {
    const myPets = (await screen.findAllByText("Kutyáim"))[0];

    await act(async () => {
        fireEvent.click(myPets);
        await new Promise(resolve => setTimeout(resolve, 1000))
    });

    await act(async () => {
        fireEvent.click(screen.getByText("Tovább"));
        await new Promise(resolve => setTimeout(resolve, 1000))
    });

    act(() => {
        fireEvent.click(screen.getByTestId("edit"));
    });

    act(() => {
        fireEvent.change((screen.getByLabelText('Név', {exact: false})), {
            target: {value: testData.petName + testData.petName},
        })
    });

    await act(async () => {
        fireEvent.click(screen.getByTestId("submit-upload"));
        await new Promise(resolve => setTimeout(resolve, 1000))
    });

    expect(screen.getByText(testData.petName + testData.petName))
});
