#include <iostream>
using namespace std;

long long int result(long long a)
{
	return (((a) * (a + 1)) / 2);
}
int main()
{
	int t;
	cin >> t;
	bool flag=false;
	if (t >= 1 && t <= 25 )
		flag=true;
	if(flag==true)
	{
		long long int* arr1 = new long long int[t];
		long long int* arr2 = new long long int[t];
		for (int i = 0; i < t; i++)
		{
		long long int n;
		cin >> n;
		while (n < 1 || n > 1000)
			cin >> n;
		long long int m;
		cin >> m;
		while (m < 1 || m > 1000)
			cin >> m;
		arr1[i] = (m * n);
		arr2[i] = result(m * n);
		//cout << m * n << " " << result(m * n) << "\n"; 
		}
		for (int i = 0; i < t; i++)
		{
		cout << arr1[i] << " " << arr2[i] << "\n";
		}
	}
	return 0;
}
