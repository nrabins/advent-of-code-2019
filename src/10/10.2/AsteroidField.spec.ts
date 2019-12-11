import { Point } from '../../util/Point'
import { AsteroidField } from './AsteroidField';

test("Large example", () => {
  const field = AsteroidField.fromFile("src/10/10.1/tests/example5.txt");

  const vaporizationOrder = field.getVaporizationOrder(new Point(11, 13));

  expect(vaporizationOrder.length).toBe(299);
  
  expect(vaporizationOrder[0].toString()).toBe("11,12");
  expect(vaporizationOrder[1].toString()).toBe("12,1");
  expect(vaporizationOrder[2].toString()).toBe("12,2");
  expect(vaporizationOrder[9].toString()).toBe("12,8");
  expect(vaporizationOrder[19].toString()).toBe("16,0");
  expect(vaporizationOrder[49].toString()).toBe("16,9");
  expect(vaporizationOrder[99].toString()).toBe("10,16");
  expect(vaporizationOrder[198].toString()).toBe("9,6");
  expect(vaporizationOrder[199].toString()).toBe("8,2");
  expect(vaporizationOrder[200].toString()).toBe("10,9");
  expect(vaporizationOrder[298].toString()).toBe("11,1");

});
