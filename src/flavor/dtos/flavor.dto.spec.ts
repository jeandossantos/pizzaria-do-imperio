import { validate } from 'class-validator';
import { CreateFlavorDto } from './flavor.dto';

describe('CreateCustomerDto', () => {
  let createCustomerDto: CreateFlavorDto;

  beforeEach(() => {
    createCustomerDto = new CreateFlavorDto();
    createCustomerDto.name = 'Mussarela';
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
