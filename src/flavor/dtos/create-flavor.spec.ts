import { validate } from 'class-validator';
import { CreateFlavorDto } from './create-flavor.dto';

describe('CreateCustomerDto', () => {
  let createCustomerDto: CreateFlavorDto;

  beforeEach(() => {
    createCustomerDto = new CreateFlavorDto();
    createCustomerDto.name = 'Mussarela';
    createCustomerDto.size = 2;
    createCustomerDto.border = false;
    createCustomerDto.priceSmall = 10;
    createCustomerDto.priceMedium = 15;
    createCustomerDto.priceLarge = 20;
    createCustomerDto.priceBordered = 25;
  });

  test('should not be valid with invalid name', async () => {
    createCustomerDto.name = '';
    const dto = createCustomerDto;

    let errors = await validate(dto);

    let expectedError = 'name should not be empty';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isNotEmpty).toStrictEqual(expectedError);

    dto.name = null;

    errors = await validate(dto);

    expectedError = 'name must be a string';

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.isString).toStrictEqual(expectedError);
  });

  test('should not be valid with invalid size', async () => {
    createCustomerDto.size = undefined;

    const dto = createCustomerDto;
    let errors = await validate(dto);
    let expectedErrors = {
      min: 'size must not be less than 0',
      max: 'size must not be greater than 2',
      isNumber: 'size must be a number conforming to the specified constraints',
    };

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints.min).toStrictEqual(expectedErrors.min);
    expect(errors[0].constraints.max).toStrictEqual(expectedErrors.max);
  });

  test('should not be valid with invalid border', async () => {
    createCustomerDto.border = undefined;

    const dto = createCustomerDto;
    const expectedError = 'border must be a boolean value';

    const errors = await validate(dto);

    expect(errors[0].constraints.isBoolean).toStrictEqual(expectedError);
  });

  test('should not be valid with invalid prices', async () => {
    createCustomerDto.priceSmall = NaN;
    createCustomerDto.priceMedium = NaN;
    createCustomerDto.priceLarge = NaN;
    createCustomerDto.priceBordered = NaN;

    const dto = createCustomerDto;

    const expectedErrors = {
      priceSmall:
        'priceSmall must be a number conforming to the specified constraints',
      priceMedium:
        'priceMedium must be a number conforming to the specified constraints',
      princeLarge:
        'priceLarge must be a number conforming to the specified constraints',
      priceBordered:
        'priceBordered must be a number conforming to the specified constraints',
    };

    const errors = await validate(dto);

    expect(errors).toHaveLength(4);
    expect(errors[0].constraints.isNumber).toStrictEqual(
      expectedErrors.priceSmall,
    );
    expect(errors[1].constraints.isNumber).toStrictEqual(
      expectedErrors.priceMedium,
    );
    expect(errors[2].constraints.isNumber).toStrictEqual(
      expectedErrors.princeLarge,
    );
    expect(errors[3].constraints.isNumber).toStrictEqual(
      expectedErrors.priceBordered,
    );
  });
});
