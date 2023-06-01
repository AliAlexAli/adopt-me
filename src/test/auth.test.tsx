import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { testData } from "./testData";

test("Register test", async () => {
    render(<App/>);

    act(() => {
        fireEvent.click(screen.getAllByText("Regisztráció")[0]);
    });

    const emailInput = screen.getByLabelText('Email', {exact: false})
    const passwordInput = screen.getByLabelText('Jelszó', {exact: false})
    const nameInput = screen.getByLabelText('Név', {exact: false})
    const telInput = screen.getByLabelText('Telefonszám', {exact: false})
    const addressInput = screen.getByLabelText('Cím', {exact: false})
    const websiteInput = screen.getByLabelText('Honlap', {exact: false})

    fireEvent.change(emailInput, {
        target: {value: testData.email},
    })

    fireEvent.change((passwordInput), {
        target: {value: testData.password},
    })

    fireEvent.change((nameInput), {
        target: {value: testData.name},
    })

    fireEvent.change((telInput), {
        target: {value: testData.phone},
    })

    fireEvent.change((addressInput), {
        target: {value: testData.address},
    })

    fireEvent.change((websiteInput), {
        target: {value: testData.site},
    })

    await act(async () => {
        fireEvent.click(screen.getByTestId("submit-register"));
        await new Promise(resolve => setTimeout(resolve, 1000))
    });

    const myProfile = (await screen.findAllByText("Profilom"))[0];

    act(() => {
        fireEvent.click(myProfile);
    });

    expect((screen.getByLabelText('Név', {exact: false}) as HTMLInputElement).value).toBe(testData.name)
    expect((screen.getByLabelText('Telefon', {exact: false}) as HTMLInputElement).value).toBe(testData.phone)
    expect((screen.getByLabelText('Cím', {exact: false}) as HTMLInputElement).value).toBe(testData.address)
    expect((screen.getByLabelText('Honlap', {exact: false}) as HTMLInputElement).value).toBe(testData.site)
});

test("Login test", async () => {
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

    const exit = (await screen.findAllByText("Kilépés"))[0];

    await act(async () => {
        fireEvent.click(exit);
    });
});