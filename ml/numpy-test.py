import numpy as np

a = np.array([[1, 2, 3], [1, 2, 3], [1, 2, 3]])

# print(a[0])
# print(a[0][0])

b = np.array([1, 2, 3])
c = np.array([4, 5, 6])
d = np.array([7, 8, 9])

e = np.column_stack(([b, c, d]))
# print(e)
print(e)
print(e.shape[0])
