#include <bits/stdc++.h>
using namespace std;

/* TYPES  */
int main()
{
	for(int j=0; j < K; j++)
	{
		for(int i=A.size()-1; i >= 1; i--)
		{
			swap(A[i-1], A[i]);
		}
	}
	return A;
}
