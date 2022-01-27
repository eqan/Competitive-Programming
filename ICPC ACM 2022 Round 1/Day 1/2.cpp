//

#include "stdafx.h"
#include <iostream>
#include <vector>
#include <math.h>

using namespace std;

int main()
{
	int n;
	int x, y, x2, y2;
	cin >> x >> y;
	int **a = new int*[x];
	*a = new int[y];
	for (int i = 0; i < x; i++)
	{
		for (int j = 0; j < y; j++)
		{			
			cin >> a[i][j];
			cout << a[i][j];
		}
	}
	cin >> x2 >> y2;
	int **b = new int*[x2];
	*b = new int[y2];
	for (int i = 0; i < x2; i++)
	{
		for (int j = 0; j < y2; j++)
		{
			cin >> b[i][j];
			cout << b[i][j];
		}
	}

	system("pause");
}