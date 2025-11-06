import { describe, expect, test } from "vitest";
import { formatTodaysDate } from "./format-todays-date.js";


describe('format todays date', () => {
    test('nz format', async () => {
        const response = await formatTodaysDate({format: 'DD/MM/YYYY'});
        // console.log(response);

        expect(response.data.date).toBe(todaysDate());
    });

    test('year first', async () => {
        const response = await formatTodaysDate({format: 'YYYY/MM/DD'});
        // console.log(response);

        expect(response.data.date).toBe(yearFirst());
    });
}, 10000);

const todaysDate = () => {
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}

const yearFirst = () => {
    const today = new Date();

    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const yyyy = today.getFullYear();

    return `${yyyy}/${mm}/${dd}`;
}