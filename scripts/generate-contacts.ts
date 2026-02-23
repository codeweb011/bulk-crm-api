import { createWriteStream } from 'fs';
import { randomUUID } from 'crypto';

const stream = createWriteStream('contacts.csv');

type Status = 'NEW' | 'ACTIVE' | 'PROMOTED' | 'INACTIVE';

const DISTRIBUTION: Record<Status, number> = {
    NEW: 2_000_000,
    ACTIVE: 3_000_000,
    PROMOTED: 3_000_000,
    INACTIVE: 2_000_000,
};

const countries = ['India', 'US', 'UK', 'Germany', 'Canada'];
const TOTAL =
    DISTRIBUTION.NEW +
    DISTRIBUTION.ACTIVE +
    DISTRIBUTION.PROMOTED +
    DISTRIBUTION.INACTIVE;

let globalCounter = 0;

async function generateBlock(status: Status, count: number) {
    for (let i = 0; i < count; i++) {
        globalCounter++;

        const id = randomUUID();
        const firstName = `First${globalCounter}`;
        const lastName = `Last${globalCounter}`;
        const email = `user${globalCounter}@example.com`; // unique
        const phone = `9${(100000000 + globalCounter).toString().slice(-9)}`;
        const country = countries[globalCounter % countries.length];
        const ownerId = randomUUID();
        const isDeleted = false;
        const now = new Date().toISOString();

        const row = `${id},${firstName},${lastName},${email},${phone},${country},${status},${ownerId},${isDeleted},${now},${now}\n`;

        if (!stream.write(row)) {
            await new Promise<void>((resolve) => {
                stream.once('drain', () => resolve());
            });
        }

        if (globalCounter % 100000 === 0) {
            console.log(`Generated ${globalCounter}/${TOTAL}`);
        }
    }
}

(async () => {
    console.log('Starting CSV generation...');

    await generateBlock('NEW', DISTRIBUTION.NEW);
    await generateBlock('ACTIVE', DISTRIBUTION.ACTIVE);
    await generateBlock('PROMOTED', DISTRIBUTION.PROMOTED);
    await generateBlock('INACTIVE', DISTRIBUTION.INACTIVE);

    stream.end();
    console.log('Finished generating 10M contacts.');
})();