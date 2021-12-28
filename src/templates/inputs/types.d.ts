declare interface TemplateAutocompleteProps
  extends Omit<
    import('components').AutocompleteProps,
    'options' | 'getOptionValue' | 'getOptionLabel'
  > {}
