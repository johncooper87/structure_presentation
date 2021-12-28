import { setLocale } from 'yup';
import plural from 'utils/plural';

setLocale({
  mixed: {
    required: 'Необходимо указать значение',
  },
  string: {
    length: ({ length }: { length: number }) =>
      `Значение должно состоять ровно из ${length} ${plural(length, 'символа', 'символов')}`,
  },
});
