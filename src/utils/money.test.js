import { it , expect , describe} from 'vitest';
import { formateMoney } from './money';

describe('formateMoney', ()=>{
    it ('formates 1999 cents as $19.99', ()=>{
        expect(formateMoney(1999)).toBe('$19.99');
    })

    it('displays 2 decimals', ()=>{
        expect(formateMoney(1090)).toBe('$10.90');
    }
    ) 
})
