export default defineNuxtPlugin({
  name: 'currency',
  setup() {
    const toCurrency = (value: number) => {
      // Здесь можно получить доступ к разным сервисам, например: const { locale } = useI18n();
      return value.toLocaleString('ru-RU');
    };
    return {
      provide: {
        toCurrency,
      },
    };
  },
});
