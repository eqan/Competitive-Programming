#include <iostream>
using namespace std;

int result(int a)
{
	return ((a)*(a+1)) / 2;
}


int main()
{
	int t; 
	cin >> t; 
	while (t < 1 || t > 25)
		cin >> t; 
	for (int i = 0; i < t; i++)
	{
		int n;
		cin >> n;
		while (n < 1 || n > 1000)
			cin >> n;
		int m;
		cin >> m;
		while (m < 1 || m > 1000)
			cin >> m;
		cout << m * n << " " << result(m * n); 
		
	}
}