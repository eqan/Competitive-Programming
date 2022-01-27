#include <iostream>
#include <stack>
#include <cstdlib>
#include <queue>
#include <vector>
using namespace std;

/* TYPES  */
#define ll long long
#define pii pair<int, int>
#define pll pair<long long, long long>
#define vi vector<int>
#define vll vector<long long>
#define mii map<int, int>
#define si set<int>
#define sc set<char>

/* UTILS */
#define MOD 1000000007 #define PI 3.1415926535897932384626433832795
ll min(ll a, int b) { if (a<b) return a; return b; }
ll min(int a, ll b) { if (a<b) return a; return b; }
ll max(ll a, int b) { if (a>b) return a; return b; }
ll max(int a, ll b) { if (a>b) return a; return b; }
ll gcd(ll a, ll b) { if (b == 0) return a; return gcd(b, a%b); }
ll lcm(ll a, ll b) { return a / gcd(a, b)*b; }
string to_upper(string a) { for (int i = 0; i<(int)a.size(); ++i) if (a[i] >= 'a' && a[i] <= 'z') a[i] -= 'a' - 'A'; return a; }
string to_lower(string a) { for (int i = 0; i<(int)a.size(); ++i) if (a[i] >= 'A' && a[i] <= 'Z') a[i] += 'a' - 'A'; return a; }
bool prime(ll a) { if (a == 1) return 0; for (int i = 2; i <= round(sqrt(a)); ++i) if (a%i == 0) return 0; return 1; }
void yes() { cout << "YES\n"; }
void no() { cout << "NO\n"; }

/*  All Required define Pre-Processors and typedef Constants */
typedef long int int32;
typedef unsigned long int uint32;
typedef long long int int64;
typedef unsigned long long int  uint64;

int compare(const void* a, const void* b)
{
	const int* x = (int*)a;
	const int* y = (int*)b;

	if (*x > *y)
		return 1;
	else if (*x < *y)
		return -1;

	return 0;
}

int qsortarr(int arr[], int size)
{
	qsort(arr, size, sizeof(int), compare);
	return *arr;
}

template<typename T, size_t n>
void print_array(T const(&arr)[n])
{
	for (size_t i = 0; i < n; i++) {
		std::cout << arr[i] << ' ';
	}
}

void print_array(std::vector <int> const &a) {
	for (int i = 0; i < a.size(); i++)
		std::cout << a.at(i) << ' ';
}

void sort(vector<int>& v)
{
	sort(v.begin(), v.end());
}

template<class T>
constexpr size_t len(T &a)
{
	return sizeof(a) / sizeof(typename std::remove_all_extents<T>::type);
}

unsigned concatenate(unsigned x, unsigned y) {
	unsigned pow = 10;
	while (y >= pow)
		pow *= 10;
	return x * pow + y;
}
vector<vector<int>> transposeOfAMatrix(vector<vector<int>> v1)
{
	vector<vector<int>> v2;
	for (int i = 0; i < v1.size(); i++)
		for (int j = 0; j < v1.size(); j++)
			v2[j].push_back(v1[i][j]);
	return v2;
}
bool checkPrimeNumber(int n) {
	bool isPrime = true;
	if (n == 0 || n == 1) {
		isPrime = false;
	}
	else {
		for (int i = 2; i <= n / 2; ++i) {
			if (n % i == 0) {
				isPrime = false;
				break;
			}
		}
	}
	return isPrime;
}
int main()
{
	vector<int> input({ 2, 5, 3, 4, 0 });
	input.empty();
	print_array(input);
	/*sort(input);
	cout << input[input.size() - 1];*/
	return 0;
}