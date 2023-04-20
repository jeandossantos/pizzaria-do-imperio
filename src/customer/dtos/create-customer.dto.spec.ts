import { CreateCustomerDto } from './create-customer.dto';
import { validate } from 'class-validator';

describe('CreateCustomerDto', () => {
  let createCustomerDto: CreateCustomerDto;

  beforeEach(() => {
    createCustomerDto = new CreateCustomerDto();
    createCustomerDto.name = 'John Doe';
    createCustomerDto.phone = '1234567890';
    createCustomerDto.neighborhood = 'Central Park';
    createCustomerDto.street = 'Fifth Avenue';
    createCustomerDto.number = 1234;
    createCustomerDto.complement = 'Apt 42';
  });

  test('should not be valid with invalid name', async () => {
    createCustomerDto.name = '';
    const dto = createCustomerDto;

    let errors = await validate(dto);

    let expectedError = 'name should not be empty';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toStrictEqual(expectedError);

    createCustomerDto.name = null;

    errors = await validate(dto);

    expectedError = 'name must be a string';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toStrictEqual(expectedError);
  });

  test('should not be valid with invalid telefone', async () => {
    createCustomerDto.phone = '';
    const dto = createCustomerDto;

    let errors = await validate(dto);

    let expectedError = 'phone should not be empty';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toStrictEqual(expectedError);

    createCustomerDto.phone = null;

    errors = await validate(dto);

    expectedError = 'phone must be a string';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toStrictEqual(expectedError);
  });

  test('should not be valid with invalid with neighborhood', async () => {
    createCustomerDto.neighborhood = '';
    const dto = createCustomerDto;

    let errors = await validate(dto);

    let expectedError = 'neighborhood should not be empty';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toStrictEqual(expectedError);

    createCustomerDto.neighborhood = null;

    errors = await validate(dto);

    expectedError = 'neighborhood must be a string';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toStrictEqual(expectedError);
  });

  test('should not be valid with invalid with street', async () => {
    createCustomerDto.street = '';
    const dto = createCustomerDto;

    let errors = await validate(dto);

    let expectedError = 'street should not be empty';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toStrictEqual(expectedError);

    createCustomerDto.street = null;

    errors = await validate(dto);

    expectedError = 'street must be a string';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toStrictEqual(expectedError);
  });

  test('should not be valid with invalid with number', async () => {
    createCustomerDto.number = undefined;

    const dto = createCustomerDto;

    let errors = await validate(dto);

    let expectedError = 'number should not be empty';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toStrictEqual(expectedError);

    createCustomerDto.number = NaN;

    errors = await validate(dto);

    expectedError =
      'number must be a number conforming to the specified constraints';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNumber).toStrictEqual(expectedError);
  });

  test('should not be valid with invalid with complement', async () => {
    createCustomerDto.complement = null;

    const dto = createCustomerDto;
    const errors = await validate(dto);
    const expectedError = 'complement must be a string';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toStrictEqual(expectedError);
  });

  test('should be valid with valid data', async () => {
    const errors = await validate(createCustomerDto);

    expect(errors).toHaveLength(0);
  });
});
