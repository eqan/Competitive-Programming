#include <iostream>
#include <vector>
#include <math.h>
#include <climits>

using namespace std;

int main()
{
	int n, size, priority, input;
	int vectorSize = INT_MIN, tempVectorSize;
	cin >> n;
	vector<int> v, tempVector, resultVector;
	for (int i = 0; i < n; i++)
	{
		cin >> size;
		cin >> priority;
		for (int i = 0; i < size; i++)
		{
			cin >> input;
			v.push_back(input);
		}
	}
	

	for (int z = 0; z < n; z++)
	{
		for (int i = 0; i < size; i++)
		{
			int max = INT_MIN;
			for (int j = i; j < size; j++)
			{
				if (max < v[j])
					max = v[j];
				if (max >= v[j])
					tempVector.push_back(max);
			}
			tempVector.empty();
			tempVectorSize = tempVector.size();
			if (tempVectorSize > vectorSize)
			{
				vectorSize = tempVectorSize;
				resultVector.empty();
				for (int j = 0; j < tempVector.size(); j++)
				{
					resultVector.push_back(tempVector[j]);
				}
			}
			tempVector.empty();
		}
		cout << "Case#" << z << ": " << resultVector.size();
		for (int i = 0; i < resultVector.size(); i++)
		{
			cout << " " << resultVector[i];
		}
}
	system("pause");
}

