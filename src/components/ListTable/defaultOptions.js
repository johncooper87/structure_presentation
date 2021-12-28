const defaultOptions = {
  responsive: 'standard',
  selectableRows: 'none',
  viewColumns: false,
  expandableRowsOnClick: true,
  textLabels: {
    body: {
      noMatch: 'Извините, записи не найдены',
      toolTip: 'Sort',
      columnHeaderTooltip: column => `Сортировать по ${column.label}`,
    },
    pagination: {
      next: 'Следующая страница',
      previous: 'Предыдущая страница',
      rowsPerPage: 'Строк на странице:',
      displayRows: 'из',
    },
    toolbar: {
      search: 'Поиск',
      downloadCsv: 'Скачать в Excel',
      print: 'Распечатать',
      viewColumns: 'Показать столбцы',
      filterTable: 'Фильтровать таблицу',
    },
    filter: {
      all: 'Все',
      title: 'ФИЛЬТРЫ',
      reset: 'СБРОС',
    },
    viewColumns: {
      title: 'Показать столбцы',
      titleAria: 'Показать/скрыть столбцы таблицы',
    },
    selectedRows: {
      text: 'выбранные строки',
      delete: 'Удалить',
      deleteAria: 'Удалить выбранные строки',
    },
  },
};

export default defaultOptions;
