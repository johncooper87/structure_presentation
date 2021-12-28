import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    // logErrorToMyService(error, errorInfo);
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      // setInterval(() => window.location.reload(), 5000);
      // Можно отрендерить запасной UI произвольного вида
      return (
        <>
          <h1 className="text-center">
            Что-то пошло не так. Мы уже работаем над проблемой! Сейчас вы будете перенаправлены на
            страницу авторизации.
          </h1>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
