#include <iostream>

using namespace std;

int main() {
  string s, h;
  int hr;
  cin >> s;
  hr = ((s[0] - '0') * 10) + (s[1] - '0');
  if (s[8] == 'P' && s[9] == 'M' && hr == 12)
    cout << hr;
  else if (s[8] == 'P' && s[9] == 'M')
    cout << hr + 12;
  else if (s[8] == 'A' && s[9] == 'M' && hr == 12)
    cout << 00;
  else cout << s[0] << s[1];

  for (int i = 2; i < 8; i++)
    cout << s[i];
  cout << endl;
  return 0;
}