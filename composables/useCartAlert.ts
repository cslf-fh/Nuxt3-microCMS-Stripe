const useCartAlert = () => {
  const alert = useState('alert', () => false); // カートに商品を追加した時のアラートの制御
  const timer = useState('timer', () => undefined); // タイマーの管理

  // アラートのトグル
  const toggleAlert = () => {
    alert.value = true; // アラートを表示
    clearTimeout(timer.value); // 以前のタイマーを解除
    timer.value = setTimeout(() => (alert.value = false), 3000); // タイマーを開始し、アラートを非表示
  };

  return {
    alert: readonly(alert),
    toggleAlert,
  };
};

export default useCartAlert;
